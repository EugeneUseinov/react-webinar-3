export default {
  getComments: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/getComments-start'});
      try {
        const res = await services.api.request({
          url: `api/v1/comments?search[parent]=${id}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type,_tree)),count`
        });
        dispatch({type: 'comments/getComments-success', payload: {data: res.data.result}});
      } catch (e) {
        dispatch({type: 'comments/getComments-error'});
      }
    }
  },

  postComments: (text, parent) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/postComments-start'});
      try {
        const res = await services.api.request({
          url: `api/v1/comments?fields=*,author(profile)`,
          method: 'POST',
          body: JSON.stringify({
            text,
            parent: parent
          })
        });
        dispatch({type: 'comments/postComments-success', payload: {data: res.data.result}});
      } catch (e) {
        dispatch({type: 'comments/postComments-error'});
      }
    }
  }
}