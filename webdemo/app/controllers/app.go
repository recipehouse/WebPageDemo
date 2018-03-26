package controllers

import (
	"github.com/revel/revel"
	"github.com/levigross/grequests"
	"encoding/json"
	"strings"
	"log"
	"net/http"
)

type recipeinfo struct {
	Hits []struct {
		Recipe struct {
			URI             string        `json:"uri"`
			Label           string        `json:"label"`
			Image           string        `json:"image"`
			Source          string        `json:"source"`
			URL             string        `json:"url"`
			ShareAs         string        `json:"shareAs"`
			IngredientLines []string      `json:"ingredientLines"`
			Ingredients     []struct {
				Text   string  `json:"text"`
				Weight float64 `json:"weight"`
			} `json:"ingredients"`
		} `json:"recipe"`
	} `json:"hits"`
}

type App struct {
	*revel.Controller
}

type MyHtml string

func (r MyHtml) Apply(req *revel.Request, resp *revel.Response) {
	resp.WriteHeader(http.StatusOK, "text/html")
	resp.GetWriter().Write([]byte(r))
}

func (c App) Index() revel.Result {
	greeting := "Welcome to Recipe House!!!"
	return c.Render(greeting)
}

func (c *App) SearchPage(ingres string) revel.Result  {

	r, err := grequests.Get("Http://localhost:1323/getrecipes1?ingr=" + strings.Replace(ingres, " ", "+", -1), nil)

	if err != nil {
		log.Fatal(err)
		return c.Render(err)
	}

	var ris recipeinfo
	json.Unmarshal(r.Bytes() , &ris)

	var res string

	for i := 0; i < len(ris.Hits); i++{
		res += "<li>" +  "<a href=" + ris.Hits[i].Recipe.URL + ">" + ris.Hits[i].Recipe.Label + "</a>"  + "<li>"
	}


	return MyHtml(res)
}
