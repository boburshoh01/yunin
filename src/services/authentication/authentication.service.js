import ApiService from "../api.service";

const AccountService = {
  SignIn(data) {
    return ApiService.post("/api/Authentication", data);
  },
};
export default AccountService;
