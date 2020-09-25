import blogService from '../services/blogs';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.id);
    case 'LIKE':
      return state.map((blog) => (blog.id !== action.data.id ? blog : action.data));
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.createNew(content);
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    });
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch({
      type: 'REMOVE_BLOG',
      id,
    });
  };
};

export const like = (data) => {
  const { user, ...blogWithoutUser } = data;
  return async (dispatch) => {
    const updatedBlog = await blogService.update(data.id, blogWithoutUser);
    dispatch({
      type: 'LIKE',
      data: updatedBlog,
    });
  };
};
export default reducer;
