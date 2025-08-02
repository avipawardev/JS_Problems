import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';

export const RecipeContext = createContext();


export const allRecipes = ()=>useContext(RecipeContext);