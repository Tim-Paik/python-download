import os
import sys
import requests
from packaging import version

version_manifest = requests.get(
    'https://raw.githubusercontent.com/actions/python-versions/main/versions-manifest.json'
).json()

versions = list(map(lambda x: version.parse(x['version']), version_manifest))
versions.sort()

last_release = ''

for v in versions:
    if not (v.is_prerelease or v.is_devrelease):
        last_release = str(v)

urls = ['https://mirror.bjtu.edu.cn/python/__VERSION__/',
        'https://mirror.bjtu.edu.cn/python/__VERSION__/python-__VERSION__-amd64.exe',
        'https://mirror.bjtu.edu.cn/python/__VERSION__/python-__VERSION__-macos11.pkg',
        'https://mirror.bjtu.edu.cn/python/__VERSION__/Python-__VERSION__.tar.xz']

for url in urls:
    res = requests.head(url.replace('__VERSION__', last_release), headers={'user-agent': 'my-app/0.0.1'})
    if (res.status_code != requests.codes.ok):
        print('error in url check:')
        print(url.replace('__VERSION__', last_release))
        print(res.status_code)
        print(res.text)
        sys.exit(1)

template = open("template.html").read()
html = open("index.html", 'r').read()

new_html = template.replace('__VERSION__', last_release)

if html == new_html:
    print('no updates.')
    sys.exit()
else:
    index = open("index.html", 'w')
    index.truncate(0)
    index.write(new_html)
    index.flush()
    print('update avaliable: ' + last_release)
