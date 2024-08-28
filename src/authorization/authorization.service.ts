import { Injectable } from "@nestjs/common"
import { UserRepository } from "src/user/user.repository"
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthorizationService {
  constructor(private readonly userRepository: UserRepository) { }

  async login(email: string, password: string, phoneNumber: string) {
    const user = await (this.userRepository.findOneWithEmail(email) || this.userRepository.findOneWithPhoneNumber(phoneNumber))
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const { password, ...res } = user
        return res
      } else {
        return 'პაროლი არასწორია'
      }
    } else {
      return 'იმეილი არასწორია'
    }

  }
}
