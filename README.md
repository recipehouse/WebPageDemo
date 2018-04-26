# Welcome to RecipeHouse Web

# Intro

This repo contians source code of web interface of recipehouse services

This web interface using revel framework to achieve that functionalities

# Instructions of set up

This instruction is based on CentOS 7

## Denpendencies

	- grequests
	- echo
	- revel


first make sure golang is installed currectly
to install golang, execute `sudo yum install go`
to check if go is ready, execute `go version`

set the GOPATH correctly by execute `export GOPATH=/home/<your username>/gocode`

then get the dependencies by execute the following command sequencially


`go get -u github.com/levigross/grequests`

`go get -u github.com/labstack/echo/...`

`go get github.com/revel/revel`

`go get github.com/revel/cmd/revel`

## Compile the api

recipehouse api can be compiled by first change the directory to the folder that contains api source code
<br>

then execute `go build main.go`
<br>

and then execute that generated binary file in BACKGROUND

## Compile the webdemo

first need to install revel correctly
<br>

then put the whole folder which contains the webdemo source code in GOAPTH/src file
<br>

then execute `export PATH="$PATH:$GOPATH/bin"`
<br>

and change the directory to the folder that contains webdemo source code in GOPATH/src
<br>

then execute `revel run`
<br>

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
