import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

export const useApi = (queryKey, queryFn, options = {}) => {
  return useQuery(queryKey, queryFn, {
    retry: 1,
    refetchOnWindowFocus: false,
    ...options
  });
};

export const useApiMutation = (mutationFn, options = {}) => {
  const queryClient = useQueryClient();
  
  return useMutation(mutationFn, {
    onSuccess: (data, variables, context) => {
      if (options.invalidateQueries) {
        queryClient.invalidateQueries(options.invalidateQueries);
      }
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options
  });
};