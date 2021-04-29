export interface Photo {
  photos:{
    page: number;
    pages: number;
    perpage: number;
    total: string;
    photo: [
      {
        id: string;
        owner: string;
        secret: string;
        server: string;
        farm: string;
        title: string;
        ispublic: string;
        isfriend: string;
        isfamily: string;
      }
    ]
  },
  stat: string;
}

export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface fbAuthResponse {
  idToken?: string;
  expiresIn?: string;
}
