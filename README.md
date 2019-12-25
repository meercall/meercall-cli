# meercall-cli

Use the Meercall CLI to pull your configs in `JSON`, `XML`, of `.env` format. To use the CLI you'll need:

  - Meercall Space API Key
  - Meercall Space Tag Name
  - Meercall Space Secrets Encryption Key (Optional)
  
## Installation

1. Download a release (https://github.com/meercall/meercall-cli/releases) for your system. If a release is not available for your system architecture, please open a ticket. You can also build executables using this repo and [pkg](https://github.com/zeit/pkg) (see below).
1. Assign executable permissions: `sudo chmod +x /path/to/meercall`

### Building your own executable

1. Install Node 12+, npm, and [pkg](https://github.com/zeit/pkg).
2. Clone and `cd` into repo folder. 
3. Run `$ pkg -t node12-[platform]-[arch] meercall.js`
    - Replace `[platform]` with: `freebsd`, `linux`, `alpine`, `macos`, or `win`
    - Replace `[arch]` with: `x64`, `x86`, `armv6`, or `armv7`

## Usage

### meercall pull [tag] [filepath].[ext] 

- Ensure `MEERCALL_API_KEY` and `MEERCALL_SECRET_KEY` env vars are set. If `MEERCALL_SECRET_KEY` is not set, only non-secret configs will be returned.
- Call `./path/to/meercall pull tag filepath.ext` where `[tag]` is the desired tag name and `.ext` is one of the following: `.json`, `.env`, `.xml`.