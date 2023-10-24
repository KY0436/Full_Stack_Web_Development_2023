
const dummy = (blogs) => {

  // Dummy test for assignment 4.7
  return 1
}

const totalLikes = (listWithOneBlogs) => {

  //Test for assignment 4.8
  let total_Likes = 0
  listWithOneBlogs.forEach(element => {
    total_Likes=total_Likes+element.likes
  });

  return total_Likes
}

const favoriteBlog = (blogs) => {

  //Test for assignment 4.8
  let max_likes = 0
  let max_index = 0
  blogs.forEach((element,index) => {
    if (element.likes>max_likes){
      max_likes = element.likes
      max_index = index
    }
  })

  return {
    title: blogs[max_index].title,
    author: blogs[max_index].author,
    likes: blogs[max_index].likes
  }
}

// Used for calculating the number of blogs by different authors in Part 4.5
const AuthorList = (array, author_name) =>{
  // Use Recursive method
  if (array.length < 1){
    return 0
  }

  if (array.length === 1 && array[0].author != author_name){
    return 0
  }
  if (array.length === 1 && array[0].autho === author_name){
    return 1
  }

  if (array[0].author != author_name){
    return 0 + AuthorList(array.slice(1), author_name) 
  }
  if (array[0].author === author_name){
    return 1 + AuthorList(array.slice(1), author_name) 
  }

}

//Used for calculating the likes of blogs by different authors in Part 4.5
const LikeList = (array, author_name) =>{
  // Use Recursive method
  if (array.length < 1){
    return 0
  }

  if (array.length === 1 && array[0].author != author_name){
    return 0
  }
  if (array.length === 1 && array[0].autho === author_name){
    return array[0].likes
  }

  if (array[0].author != author_name){
    return 0 + LikeList(array.slice(1), author_name) 
  }
  if (array[0].author === author_name){
    return array[0].likes + LikeList(array.slice(1), author_name) 
  }

}

const mostBlogs = (blogs) => {

  //Test for assignment 4.6
  let max_blogs = 0
  let max_index = 0
  blogs.forEach((element,index) => {
    let BlogNumber = AuthorList(blogs, element.author)
    if (BlogNumber > max_blogs){
      max_blogs = BlogNumber
      max_index = index
    }

  })

  return {
    author: blogs[max_index].author,
    blogs: max_blogs
  }
}

const mostLikes = (blogs) => {

  //Test for assignment 4.7
  let max_likes = 0
  let max_index = 0
  blogs.forEach((element,index) => {
    let LikeNumber = LikeList(blogs, element.author)
    if (LikeNumber > max_likes){
      max_likes = LikeNumber
      max_index = index
    }

  })

  return {
    author: blogs[max_index].author,
    likes: max_likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}