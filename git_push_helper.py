#!/usr/bin/env python3
"""Git push helper — extracts GitHub token from Windows Credential Manager.

The bundled Git can't spawn 'sh' needed by git-credential-manager-core,
so this script bypasses the issue by extracting the token directly and
setting it as a one-shot credential for the push command.

Usage:
    python git_push_helper.py [branch_name]
"""

import keyring
import subprocess
import os
import sys

GIT = r"D:\Program Files\Git\bin\git.exe"
REPO = r"E:\work\tecent\Velo_site_0.1"
REMOTE = "origin"
BRANCH = sys.argv[1] if len(sys.argv) > 1 else "main"

creds = keyring.get_credential("git:https://github.com", None)
if not creds:
    print("ERROR: No GitHub credentials in Windows Credential Manager")
    sys.exit(1)

url = f"https://{creds.username}:{creds.password}@github.com/marxtein/Velo-site.git"

os.chdir(REPO)
# Store old remote
old = subprocess.run([GIT, "remote", "get-url", REMOTE], capture_output=True, text=True).stdout.strip()

try:
    subprocess.run([GIT, "remote", "set-url", REMOTE, url], check=True)
    result = subprocess.run(
        [GIT, "push", REMOTE, BRANCH],
        capture_output=True, text=True, timeout=120,
        env={**os.environ, "GIT_TERMINAL_PROMPT": "0"}
    )
    print(result.stdout)
    if result.returncode == 0:
        print(f"Push OK: {BRANCH}")
    else:
        print(f"Push FAILED ({result.returncode}): {result.stderr[:500]}")
finally:
    # Restore clean URL
    subprocess.run([GIT, "remote", "set-url", REMOTE, old])
