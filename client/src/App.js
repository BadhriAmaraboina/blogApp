import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'
import './App.css';
import RootLayout from './RootLayout'
import {lazy, Suspense} from 'react'
import Home from './components/home/Home';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import UserProfile from './components/Userprofile/Userprofile';
import AuthorProfile from './components/Authorprofile/Authorprofile'
import Articles from './components/articles/Articles';


import AddArticle from './components/add-article/AddArticle';
import ArticlesByAuthor from './components/articles-by-author/ArticlesByAuthor';
import Article from './components/article/Article';
import ErrorPage from './components/Error/Error';
// dynamic import of Articles
// const Articles=lazy(()=>import('./components/articles/Articles'))
// const AddArticle=lazy(()=>import('./components/add-article/AddArticle'))
function App() {

  const browserRouter=createBrowserRouter([{
    path:'',
    element:<RootLayout />,
    errorElement:<ErrorPage />,
    children:[
      {
        path:'',
        element:<Home />
      },
      {
        path:'/Signup',
        element:<Signup />
      },
      {
        path:"/Signin",
        element:<Signin />
      },
      {
        path:"/user-profile",
        element:<UserProfile />,
        children:[
          {
            path:"articles",
            element:<Articles />
          },
          {
            path:"article/:articleId",
            element:<Article/>
          },
          {
            path:'',
            element:<Navigate to='articles'/>
          }
        ]
      },
      {
        path:"/author-profile",
        element:<AuthorProfile />,
        children:[
          {
            path:'new-article',
            element:<AddArticle/>
          },
          {
            path:'articles-by-author/:author',
            element:<ArticlesByAuthor/>,
          },
          {
            path:'article/:articleId',
            element:<Article/>
          },
          {
            path:'',
            element:<Navigate to='articles-by-author/:author'/>
          }
        ]
      }
    ]
  }])

  return (
    <div>
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;