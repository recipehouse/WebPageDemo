# Welcome to RecipeHouse Web

# Intro

This repo contians source code of web interface of recipehouse services

This web interface using revel framework to achieve that functionalities

# Instructions of set up

This instruction is based on CentOS 7

### Install Go

first make sure golang is installed currectly <br>

1. Install by executing `sudo yum install go`
2. Check if go is ready by executing `go version`

### Set the GOPATH

1. Make a directory: mkdir ~/gocode
2. Tell Go to use that as your GOPATH: export GOPATH=~/gocode


### Install Denpendencies

#### Denpendencies

	- grequests
	- echo
	- revel

#### Install dependencies

Install dependencies by execute the following command sequencially

`go get -u github.com/levigross/grequests` <br>
`go get -u github.com/labstack/echo/...` <br>
`go get github.com/revel/revel` <br>
`go get github.com/revel/cmd/revel` <br>

## Add GOPATH/bin to PATH

- `export PATH="$PATH:$GOPATH/bin"`

## Compile the api

recipehouse api can be compiled by first change the directory to the folder that contains api source code
<br>

1. `cd ~/recipehouse`
2. `go build main.go` <br>

and then execute that generated binary file in BACKGROUND

3. `./main`

## Compile the webdemo

1. Check if revel is installed correctly by executing
<br>
`revel version`

2. then put the whole folder which contains the webdemo source code in GOAPTH/src file
<br>
`mv webdemo $GOPATH/src`

3. and change the directory to the folder that contains webdemo source code in GOPATH/src
<br>
`cd $GOPATH/src/webdemo`

4. then execute `revel run`

and now you should have access to recipehouse service via browser : `127.0.0.1:9000`


### Notes

two parts for the whole project

recipehouse api
- dependencies:
	- grequests
	- echo


webdemo
- dependencies:
	- grequests
	- revel
