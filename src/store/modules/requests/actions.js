export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `https://tidal-beacon-310418-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      { method: 'POST', body: JSON.stringify(newRequest) }
    );

    const responseData = await response.json();

    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    if (!response.ok) {
      const error = new Error(response.message || 'Faild To Send');
      throw error;
    }

    context.commit('addRequest', newRequest);
  },

  async loadRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const response = await fetch(
      `https://tidal-beacon-310418-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` +
        token
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(response.message || 'Faild To Get Requests');
      throw error;
    }
    const requests = [];

    for (const key in responseData) {
      const req = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(req);
    }

    context.commit('setRequests', requests);
  },
};
