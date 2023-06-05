import React from "react";


export class Home extends React.Component {
    render() {
        return (<div>
            <div class = "head">
              <header>
                Recipe Manager
              </header>
            </div>
            <div class = "recipe-bar">
              <div class = "recipe-list-header">
                <h2>
                  Recipes:
                </h2>
              </div>
              <div class = "recipe-list">
                <ul>
                  <li>
                    <a href = "">
                    recipe one
                    </a>
                  </li>
                  <li>
                    <a href = "">
                    recipe two
                    </a>
                  </li>
                  <li>
                    <a href = "">
                    recipe three
                    </a>
                  </li>
                  <li>
                    <a href = "">
                    recipe four
                    </a>
                  </li>
                </ul>
              </div>
            </div>
        </div>)
    }
}
