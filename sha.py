#!/usr/bin/env python
import glob
import hashlib

def sha256sum(filename):
    sha256_hash = hashlib.sha256()
    with open(filename,"rb") as f:
        for byte_block in iter(lambda: f.read(4096),b""):
            sha256_hash.update(byte_block)
        print(filename + ' ' + sha256_hash.hexdigest())

if __name__ == '__main__':
    for filename in glob.glob('*.js'):
        sha256sum(filename)
    for filename in glob.glob('module.json'):
        sha256sum(filename)
