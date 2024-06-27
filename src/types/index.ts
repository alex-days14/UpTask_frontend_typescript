import { z } from "zod";

/* BACKEND AXIOS RESPONSE */
/* export const responseSchema = z.object({
    message: z.optional(z.string())
})
export type ResponseMessage = z.infer<typeof responseSchema> */

/* Auth */
const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
});

export type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<Auth, "name" | "email" | "password" | "password_confirmation">;

export type ConfirmAccountTokenForm = Pick<Auth, "token">
export type ValidateRecoveryTokenForm = Pick<Auth, "token">
export type RequestConfirmationCodeForm = Pick<Auth, "email">
export type RecoverAccountForm = Pick<Auth, "email">
export type ChangePasswordForm = Pick<Auth, "password" | "password_confirmation">;
export type UpdatePasswordForm = Pick<Auth, "current_password" | "password" | "password_confirmation">;

/* Users */
export const userSchema = authSchema.pick({
    name: true,
    email: true
}).extend({
    _id: z.string()
})

export type User = z.infer<typeof userSchema>;
export type UserFormData = Pick<User, "name" | "email">;

/* Notes */

export const noteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema,
    task: z.string(),
    createdAt: z.string(),
})

export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, "content">

/* Tasks */
export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"]);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    status: taskStatusSchema,
    completedBy: z.array(z.object({
        user: userSchema,
        status: taskStatusSchema,
        completedAt: z.string(),
        _id: z.string(),
    })),
    project: z.string(),
    notes: z.array(noteSchema),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const taskProjectSchema = taskSchema.pick({
    _id: true,
    name: true,
    description: true,
    status: true
})

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;
export type TaskProject = z.infer<typeof taskProjectSchema>

/* Projects */
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(userSchema.pick({ _id: true })),
    tasks: z.array(taskProjectSchema),
});

export const projectsSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true
    }),
);

export const projectFormSchema = projectSchema.pick({
    projectName: true,
    clientName: true,
    description: true,
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<
    Project,
    "projectName" | "clientName" | "description"
>;
export type DeleteProjectForm = Pick<Auth, 'password'>

export type SuccessResponse = {
    message: string
}

/* Teams */
export const teamMemberSchema = userSchema.pick({
    _id: true,
    name: true,
    email: true
});
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, "email">;

export const teamSchema = z.array(teamMemberSchema);
export type Team = z.infer<typeof teamSchema>;