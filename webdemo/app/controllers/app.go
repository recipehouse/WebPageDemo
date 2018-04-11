package controllers

import (
	"github.com/revel/revel"
	"github.com/levigross/grequests"
	"encoding/json"
	"strings"
	"log"
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


func (c App) Index() revel.Result {
	return c.Render()
}

func (c App) SearchPage(ingres string) revel.Result  {

	if ingres == "" {
		return c.Redirect(App.Index)
	}

	r, err := grequests.Get("Http://localhost:1323/getrecipes1?ingr=" + strings.Replace(ingres, " ", "+", -1), nil)

	if err != nil {
		log.Fatal(err)
		return c.Render(err)
	}

	var ris recipeinfo
	json.Unmarshal(r.Bytes() , &ris)

	var res string


	for i := 0; i < len(ris.Hits); i++{
		res += "<li>" +  "<a href=" + ris.Hits[i].Recipe.URL + ">" + "<img src=" + ris.Hits[i].Recipe.Image + ">" + ris.Hits[i].Recipe.Label + "</a>"  + "</li>"
	}

	if len(ris.Hits) == 0 {
		res = "Sorry, we could not find anything that matches! "
	}


	return c.Render(res)
}
