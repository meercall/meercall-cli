const fetch = require('node-fetch');
const jsonxml = require('jsontoxml');
const fs = require('fs');

const provide = {};

const domain = process.env.MEERCALL_DEBUG_LOCAL === 'true' ? 'http://localhost:3000' : 'https://meercall.com';

function saveToFile(filepath, content) {
    fs.writeFile(filepath, content, function(err) {
        if (err) {
            console.error(`ERROR: Failed to write file ${err.toString()}`);
        }
    }); 
}

function jsonToEnvFile(configs) {
    let res = '';
    const keys = Object.keys(configs);
    for (let key of keys) {
        res += `${key}=${configs[key]}\n`;
    }
    return res;
}

provide.pull = (tag, filepath, cmdObj) => {
    let { } = cmdObj;
    if (filepath) filepath = filepath.trim();
    if (!process.env.MEERCALL_API_KEY) {
        console.warn('ERROR: MEERCALL_API_KEY missing.');
        process.exit(1);
    }
    if (!process.env.MEERCALL_SECRET_KEY) {
        console.warn('WARNING: MEERCALL_SECRET_KEY missing. Only non-secret configs will be returned.');
    }
    const headers = {
        'Authorization': process.env.MEERCALL_API_KEY,
        'x-meercall-secret': process.env.MEERCALL_SECRET_KEY || ''
    }
    fetch(`${domain}/api/v1/pull/${tag}`, { headers })
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            console.error(`ERROR: (${res.status}) ${res.statusText}`);
            process.exit(1);
        }
    })
    .then(json => {
        if (filepath.endsWith('.json')) saveToFile(filepath, JSON.stringify(json));
        else if (filepath.endsWith('.env')) saveToFile(filepath, jsonToEnvFile(json))
        else if (filepath.endsWith('.xml')) saveToFile(filepath, jsonxml(json, { prettyPrint: true, xmlHeader: true }))
    })
    .catch(e => {
        console.error(`ERROR: ${e.toString()}`);
        process.exit(1);
    });
}

module.exports = provide;