

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("wd_user"))
}

//user profile pics
export const Dog1 = require("../../images/whiskey_dog1.png")
export const Dog2 = require("../../images/whiskey_dog2.png")
export const Liz1 = require("../../images/whiskey_lizard1.png")
export const Liz2 = require("../../images/whiskey_lizard2.png")
export const Cat1 = require("../../images/whiskey_cat1.png")
export const Cat2 = require("../../images/whiskey_cat2.png")
export const Bird1 = require("../../images/whiskey_bird1.png")
export const Bird2 = require("../../images/whiskey_bird2.png")


export const test = () => {
    return (
        <img src={require("../../images/absolut-elyx.png")} />
    )
}

//drinks
export const DrinkImgs = [
    {
        name: "Absolut",
        src: require("../../images/absolut-elyx.png")
    },

    {
        name: "Belvedere",
        src: require("../../images/belvedere.png")
    },

    {
        name: "Casa",
        src: require("../../images/casa-dragones.png")
    },

    {
        name: "Chopin",
        src: require("../../images/chopin.png")
    },

    {
        name: "Cimarron",
        src: require("../../images/cimarron.png")
    },

    {
        name: "Elijah",
        src: require("../../images/elijah-craig.png")
    },

    {
        name: "Four",
        src: require("../../images/four-roses.png")
    },

    {
        name: "Grey",
        src: require("../../images/grey-goose.png")
    },


    {
        name: "Hangar",
        src: require("../../images/hangar-1.png")
    },

    {
        name: "Gritona",
        src: require("../../images/la-gritona.png")
    },

    {
        name: "Ezra",
        src: require("../../images/old-ezra.png")
    },

    {
        name: "Patrida",
        src: require("../../images/partida.png")
    },

    {
        name: "Siete",
        src: require("../../images/siete-leguas.png")
    },

    {
        name: "Volcan",
        src: require("../../images/volcan.png")
    },

    {
        name: "Weller",
        src: require("../../images/w.l.weller.png")
    },

    {
        name: "Widow",
        src: require("../../images/widow-jane.png")
    }
]



