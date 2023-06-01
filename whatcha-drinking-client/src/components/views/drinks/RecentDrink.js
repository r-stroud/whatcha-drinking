export const RecentDrink = ({ id, name, type, timesTried, dateTime }) => {
    return (

        <section className="recent-drink">



            <div className="drink-img-small-frame">
                {
                    <img
                        id={`drinkImg${id}`}
                        className="drink-img-small"
                        src={require("../../../images/four-roses.png")} />
                }
            </div>
            <div className="recent-drink-details">
                <div className="recent-drink-header">Drinking Now</div>
                <div>{`${name}`}<span>{`${type}`}</span></div>

            </div>
            <div className="recent-drink-filter">


            </div>


        </section>
    )
}