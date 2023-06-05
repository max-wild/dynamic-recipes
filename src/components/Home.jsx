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
              <div class = "nav-bar">
                  <ul>
                    <h2>Where to go</h2>

                    <div class="dropdown">
                      <span>Folders</span>
                      <div class="dropdown-content">
                        <p>Folder 1</p>
                        <p>Folder 2</p>
                        <p>Folder 3</p>
                      </div>
                    </div>

                    <p>  </p>

                    <div class="dropdown">
                      <span>Recipe Actions</span>
                      <div class="dropdown-content">
                        <p>Add New Recipe</p>
                        <p>Edit Recipe</p>
                        <p>Export Recipe</p>
                      </div>
                    </div>

                    <p>  </p>

                    <div class="dropdown">
                      <span>Shopping List</span>
                      <div class="dropdown-content">
                        <p>Go to Shopping List</p>
                        <p>Export Shopping List</p>
                      </div>
                    </div>

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
