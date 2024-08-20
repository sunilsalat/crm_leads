import { Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export class CommonClass {
  encryptData(text: any): String {
    return text;
  }

  generateRandom4Digit(): number {
    const randomNum = Math.floor(Math.random() * 9999);
    // Add 1000 to ensure the number has 4 digits (if necessary)
    return randomNum + 1000;
  }

  generateRadmonToken(): string {
    return crypto.randomBytes(40).toString("hex");
  }

  signPayload(payload: any, options?: any): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: options.time,
    });
  }

  async hashPayload(payload: any): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(payload.password, salt);
    return password;
  }

  verifyPayload(token: string): string | JwtPayload {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  }

  attachCsrfTokenToRes(res: Response): string {
    const token = this.generateRadmonToken();
    res.cookie("csrf_token", token, {
      httpOnly: true,
      signed: true,
      secure: true,
      maxAge: 5 * 60 * 1000,
    });
    return token;
  }

  createJwtTokenAndAttachCookieToRes({
    res,
    payload,
    refreshTokenDb,
  }: {
    res: Response;
    payload: any;
    refreshTokenDb: string;
  }): any {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign(
      { ...payload, refreshTokenDb },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    let secure = process.env.ENV === "dev" ? false : true;

    res.cookie("access_token", accessToken, {
      path: "/",
      httpOnly: true,
      secure: secure,
      expires: new Date(
        Number(Date.now) + Number(process.env.ACCESS_TOKEN_EXPIRATION_TIME)
      ),
      maxAge: Number(process.env.ACCESS_TOKEN_EXPIRATION_TIME),
      signed: true,
      sameSite: "lax",
      domain: process.env.DOMAIN_NAME,
    });

    res.cookie("refresh_token", refreshToken, {
      path: "/",
      httpOnly: true,
      secure: secure,
      expires: new Date(
        Number(Date.now) + Number(process.env.REFRESH_TOKEN_EXPIRATION_TIME)
      ),
      maxAge: Number(process.env.REFRESH_TOKEN_EXPIRATION_TIME),
      signed: true,
      sameSite: "lax",
      domain: process.env.DOMAIN_NAME,
    });
  }

  sendNormalizedRes({
    res,
    statusCode,
    data,
    msg,
  }: {
    res: Response;
    statusCode: any;
    data: any;
    msg: string;
  }): any {
    return res.status(statusCode).json({ data, msg });
  }

  getUniqueFileName(filename: string) {
    return `${filename}-${Date.now()}`;
  }

  fromTillHelper(search: any, data: any) {
    for (let i in data) {
      if (data[i]) {
        let db_key = i.slice(0, -5); // removing _from, _till from end of
        let is_from_or_till = i.slice(-4);

        if (is_from_or_till == "from") {
          search[db_key] = { $gte: data[i] };
        }

        if (is_from_or_till == "till") {
          if (search.hasOwnProperty(db_key)) {
            search[db_key] = { ...search[db_key], $lte: data[i] };
          } else {
            search[db_key] = { $lte: data[i] };
          }
        }
      }
    }

    return search;
  }

  /*
        Helper function to correct linting
        __doc_string_ => __docString_
    */
  formateCodeLinting(sen: string): string {
    const newSen = sen.split(" ");
    let sent = "";
    const pattern = /(?<=[a-zA-Z])_([a-zA-Z])/g;

    for (let i = 0; i < newSen.length; i++) {
      const word = newSen[i];
      const formateWord = word.replace(pattern, (match, nextLetter) =>
        nextLetter.toUpperCase()
      );
      sent += `${formateWord} `;
    }

    return sent;
  }
}

export const common = new CommonClass();
