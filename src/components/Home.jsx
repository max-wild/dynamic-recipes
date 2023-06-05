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
                <ul>
                  <li>
                  recipe one
                  </li>
                  <li>
                  recipe two
                  </li>
                  <li>
                  recipe three
                  </li>
                </ul>
            </div>
        </div>)
    }
}
