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
                <div class = "recipe-header">
                  <div class = "recipe-title">
                    <h1>Example Title</h1>
                  </div>
                  <div class = "recipe-category">
                    <h3>Example Category</h3>
                  </div>
                </div>
                <div class = "recipe-image">
                </div>
                <div class = "ingredients-list">
                  <ul>
                  </ul>
                </div>
                <div class = "recipe-notes">

                </div>
                <div class = "recipe-cookware">

                </div>
                <div class = "cook-prep-time">
                  
                </div>
                <div class = "procedure">

                </div>
              </div>
            </div>
        </div>)
    }
}
