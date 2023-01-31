var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { store } from "../service/storage.service.js";
import { environment as env } from "../environment/environment.js";
import { instance } from "./axios.js";
export const getCurrentWheather = (city) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const tokenAcquisition = yield store.getValueByKey(env.token);
    const token =
      (_a = process.env.TOKEN) !== null && _a !== void 0
        ? _a
        : tokenAcquisition;
    if (!token) {
      throw new Error(
        "Token is not definet, need set [API_KEY]. Use the command -t [API_KEY]"
      );
    }

    const response = yield instance.get(`/data/2.5/weather?q=${city}&appid=${token}`);
    console.log({ data: response.data })
    return response.data;
  });
