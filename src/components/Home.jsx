import React from "react";


export class Home extends React.Component {
    render() {
        return (<div>
            <div class = "head">
              <header>
                Recipe Manager
              </header>
            </div>
            <div class = "container">
              <div class = "recipe-bar">
                  <ul>
                    <li>
                    <a>
                    recipe one
                    </a>
                    </li>
                    <li>
                    <a>
                    recipe two
                    </a>
                    </li>
                    <li>
                    <a>
                    recipe three
                    </a>
                    </li>
                  </ul>
              </div>
              <div class = "recipes">
                <h1>Example Recipe</h1>
                <p>This is example text. The box will expand based on # of details</p>
              </div>
            </div>
        </div>)
    }
}
