import sys

from setuptools import find_packages, setup

def get_version(filename):
    """Get verson from the filename"""
    import ast

    version = None
    with open(filename) as f:
        for line in f:
            if line.startswith("__version__"):
                version = ast.parse(line).body[0].value.s
                break
        else:
            raise ValueError("No version found in %r." % filename)
    if version is None:
        raise ValueError(filename)
    return version


version = get_version(filename="src/__init__.py")

install_requires = [
    "flask",
    "gevent",
    "eventlet",
    "flask_socketio",
    "flask-cors",
    "python-socketio[client]",
]

system_version = tuple(sys.version_info)[:3]

if system_version < (3, 7):
    install_requires.append("dataclasses")


setup(
    name=f"chrome-react-crunch",
    package_dir={"": "src"},
    packages=find_packages("src"),
    zip_safe=False,
    version=version,
    keywords="crunch, react, chrome, data, analysis",
    include_package_data=True,
    install_requires=install_requires,
    entry_points={},
)
