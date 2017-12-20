export const INDEX            = '/';
export const CREATE_POST      = '/createPost';
export const EDIT_POST        = '/post/edit/:postId';
export const POST             = '/:category/:postId';
export const CATEGORY         = '/:category/';

export function getParam(needle, hay){
  if( hay.length ){
    if( hay[0] === '?' ){
      hay = hay.substring(1);
    }

    let param = hay.split('&').filter(query => {
      let kv = query.split('=');

      return kv[0] === needle;
    })[0];

    if( param ){
      return param.split('=')[1];
    }
    else {
      return null;
    }
  }
}