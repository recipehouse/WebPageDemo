# Welcome to RecipeHouse Web

# Intro

This repo contians source code of web interface of recipehouse services

This web interface using revel framework to achieve that functionalities

# Instructions of set up

## Denpendencies

	- grequests
	- echo
	- revel


first make sure golang is installed currectly
set the GOPATH correctly by exec `export GOPATH=/home/<your username>/gocode`

then get the dependencies


`go get -u github.com/levigross/grequests`

`go get -u github.com/labstack/echo/...`

`go get github.com/revel/revel`

`go get github.com/revel/cmd/revel`


recipehouse api can be compiled by exec 
`go build main.go`
and exec that generated binary file in BACKGROUND

recipehouse web
first need to install revel correctly
then put the whole folder which contains recipehouse web sorce code in GOAPTH/src file

then exec `export PATH="$PATH:$GOPATH/bin"`

and `cd GOPATH/src/recipehouse web folder` then exec `revel run` 

and now you should have access to recipehouse service via browser : 127.0.0.1:9000


### Notes

two parts for the whole project

recipehouse api 
    dependencies:
        grequests
        echo


recipehouse web
    dependencies:
        grequests
        revel

