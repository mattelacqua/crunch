# crunch
Chrome extension for autofilling job applications, as well as data visualization on the job search process.

Implemented: Front end connection to extension via React. 

TODO:
Connect to Backend (Flask / DB?)


Installation:
### Installation Using Conda & Pip <a name="conda_pip"></a>

You can install all the dependencies, including PyTorch, using [Conda](https://docs.conda.io/en/latest/miniconda.html) as follows. Using MiniConda3:

```
git clone git@github.com:mattelacqua/crunch.git
```

```
cd crunch 
```

```
conda env create -f environment.yaml
```

You will need to activate your Conda environment and add the package to your Python path before you can use it
by running the following commands (you may have to reshell first for conda to work):

```
conda activate crunch
```
```
export PYTHONPATH="${PYTHONPATH}:`pwd`"
```
```
conda develop .
```

Check to see that it is sourcing the pip and python from the conda environment:

```
which python
```
```
which pip
```

You may have some issues with it not sourcing the correct pip version. If this occurs, do the following:

```
conda activate
```
```
conda install pip
```

Finally, once in the conda environment for duckietown, run pip install using the setup.py (run the following command).

*** Make sure that you install in the conda env. Might run into issues if using your machine env. 

```
pip3 install -e .
```