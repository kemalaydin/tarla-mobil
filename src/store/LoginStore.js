import {observable} from 'mobx';

class LoginStore{
    @observable login_token = null;
    @observable product_detail = "";
}

export default new LoginStore();