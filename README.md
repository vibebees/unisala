##  Naming Convention

### File And Folder:
    * files  :  in object structure i.e university.page, university.dashboard
    * folder : lowercase and may include underscores(_) i.e mock_data


`folder structure`

    |-src
    ├── mock_data
    |---src
    │   ├── mock.data           
    │   ├── theme                  
    │   ├── store 
    |   |   |-- action
    |   |   |-- reducer
    |   |   |-- store.js          
    │   ├── ui              
    |   |   |--components 
    |   |   |--pages              

    each pages should be a folder itself and render from index.js

### Components:
    Each components exported should not be default i.e export each component on it's own name and behaviour

## Server
    ionic serve