import { useDispatch } from 'react-redux';

/**
 * The custom hook to make the sequential dispatch
 *
 * @param {Array of actions array} requests The actions to be dispatched
 * @param {boolean} debug Whether the logs are sent to the client or not
 * @returns Dispatched actions results
 */
export const useSequentialDispatch = () => {
  const dispatch = useDispatch();

  const doSequentialDispatch = async (actions) => {
    if (!actions || !actions.length) return null;
    const promises = actions.map((action) => dispatch(action()));
    const responses = await Promise.all(promises);
    return responses;
  };

  return async (requests = [], debug = false, loggerFn) => {
    if (!Array.isArray(requests)) {
      const errMessage = '[Sequential] - The requests list should be an array.';
      if (debug) {
        if (typeof loggerFn === 'function') {
          loggerFn(errMessage);
        }
        console.warn(errMessage);
      }

      return false;
    }

    try {
      let result = [];

      await requests.forEach(async (seqs) => {
        if (!Array.isArray(seqs)) {
          if (debug) {
            console.warn(
              '[Sequential] - The sequential action list should be an array.'
            );
          }
        }

        seqs.forEach(async (seq) => {
          const request = await doSequentialDispatch(seq);
          result = [...result, ...(request || [])];
        });
      });

      return result;
    } catch (e) {
      if (debug) {
        if (typeof loggerFn === 'function') {
          loggerFn(e);
        }
        console.error('error', e);
      }
    }
  };
};

export default useSequentialDispatch;
