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
        </div>)
    }
}
