import { prisma } from "@/auth"

export const validateRequest = async (body: any) => {
    if (!body) {
        return "Body is empty"
    }
    if ((body.email as string).length == 0) {
        return "Empty email"
    } else {
        const existingUser = await prisma.users.findUnique({
            where: {
                email: body.email,
            },
        });
        if (existingUser) {
            return "Email already taken"
        }
    }

    if ((body.password as string).length == 0) {
        return "Emtpy password"
    }
    if (body.confirmPassword != body.password) {
        return "Passwords are mismatched"
    }
    if ((body.firstName as string).length == 0) {
        return "Empty first name"
    }
    if ((body.lastName as string).length == 0) {
        return "Empty last name"
    }
    if ((body.address as string).length == 0) {
        return "Empty crypto  wallet address"
    }
    return ""
}