package controllers

import (
	"github.com/revel/revel"
	"github.com/levigross/grequests"
	"encoding/json"
	"strings"
	"log"

	"bytes"
  "image"
  _ "image/jpeg"
  _ "image/png"
  "net/http"
  "io/ioutil"
)


const (
	_      = iota
	KB int = 1 << (10 * iota)
	MB
	GB
)

type Predictions struct {
	Predictions []struct {
		TagID       string  `json:"TagId"`
		Tag         string  `json:"Tag"`
		Probability float64 `json:"Probability"`
		} `json:"Predictions"`
}

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



func (c App) HandleUpload(pic []byte) revel.Result {
	// Validation rules.
	c.Validation.Required(pic)
	c.Validation.MinSize(pic, 2*KB).
		Message("Minimum a file size of 2KB expected")
	c.Validation.MaxSize(pic, 2*MB).
		Message("File cannot be larger than 2MB")

	// Check format of the file.
	conf, format, err := image.DecodeConfig(bytes.NewReader(pic))
	c.Validation.Required(err == nil).Key("pic").
		Message("Incorrect file format")
	c.Validation.Required(format == "jpeg" || format == "png").Key("pic").
		Message("JPEG or PNG file format is expected")

	// Check resolution.
	c.Validation.Required(conf.Height >= 150 && conf.Width >= 150).Key("pic").
		Message("Minimum allowed resolution is 150x150px")

	// Handle errors.
	if c.Validation.HasErrors() {
		c.Validation.Keep()
		c.FlashParams()
		return c.Redirect(App.Index)
	}

	ingres := vision(pic)

    return c.Redirect("/App/SearchPage?ingres=%s", ingres)

}



func vision(file []byte) string {



	   const url string = "https://southcentralus.api.cognitive.microsoft.com/customvision/v1.1/Prediction/f061cd19-ac4b-4f8f-8c41-6d741f73269a/image"

	   // This will upload the file as a multipart mime request
	   req, err := http.NewRequest("POST", url, bytes.NewBuffer(file))

	   req.Header.Set("Content-Type", "application/octet-stream")
	   req.Header.Set("Prediction-Key", "baa90e086a9d477e80a9758502f5f383")

	   client := &http.Client{}

	   resp, err := client.Do(req)
	   defer resp.Body.Close()

	   if err != nil {
	   	   log.Println("Unable to make request", err)
	   }

	   log.Println(resp.Status)

	   body, _ := ioutil.ReadAll(resp.Body)

	   var predicts Predictions
		 json.Unmarshal(body, &predicts)

		 var res string
		 for i := 0; i < 4 /* len(predicts.Predictions) */; i++{
	 		res += predicts.Predictions[i].Tag + " "
			if predicts.Predictions[i].Probability > 0.4{
				break
			}
	 	}

		log.Println(res)

        return res

}



func (c App) Chatbot() revel.Result {
	return c.Render(App.Chatbot)
}
