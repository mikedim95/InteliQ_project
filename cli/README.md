# CLI

## Contents
- Command Line interface
- CLI functional testing

## Python3 packages
- [click] - Parser for command-line options, arguments and sub-commands
- [requests] - Python HTTP library.

## Testing tool
- [pytest] - Full-featured Python testing tool

## Installation
Install requirements: 
```sh
pip3 install -r requirements.txt
```
Inside the cli directory, open terminal in administrator mode:
```sh
python setup.py install
```
## Usage 
```sh
se2250 SCOPE --param1 value1 [--param2 value2 ...]
```
To get a help message for each scope
```sh
se2250 SCOPE --help
```

## Testing
Inside the cli directory 
```sh
pytest test.py
```


   [click]: https://click.palletsprojects.com/en/8.1.x/
   [pytest]: https://docs.pytest.org/en/stable/
   [requests]: https://requests.readthedocs.io/en/master/
