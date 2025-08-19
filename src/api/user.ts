import axios from "axios";
import { endpoints } from "./endpoints";
import { axiosClient } from ".";

export const post = async () => {
  return axiosClient.get(endpoints.POST);
};
export const getpage = async (postId :number) => {
  return axiosClient.get(`/posts/${postId}`);
};
export const getComments = async (postId :number) => {
  return axiosClient.get(`/posts/${postId}/comments`);
};
 
export const postid = async (postId :number) => {
  return axiosClient.post(`/posts/${postId}`);
};