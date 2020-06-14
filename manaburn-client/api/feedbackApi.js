import {getCachedAuthAsync,signInAsync} from '../components/AppAuthHelpers'

export async function SubmitFeedback({source, message}) {
  try {
    const authState = await getCachedAuthAsync();
    // Is below necessary?
    if(authState == null){
        authState = await signInAsync();
    }
    const response = await fetch(`https://dev.drinkpoint.me/api/Feedback/PutFeedback`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer '+authState.accessToken
        },
        body: JSON.stringify({
            message,
            source
        }),
    });
    const {success, errors, data} = await response.json();
    if(success === false){
        throw(`Error posting feedback: ${errors}`);
    }
    return {id: data, success: success};
  } catch (error) {
    return({success: false, error});
  }
}