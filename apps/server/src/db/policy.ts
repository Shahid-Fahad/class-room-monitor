import type { Role } from "./schema/enums";

type Action = "read" | "create" | "update" | "delete";

type ResourceType =
  | "User"
  | "ScheduledClass"
  | "Attendance"
  | "Resource"
  | "Student"
  | "Section";

type Actor = {
  id: string;
  role: Role;
  // additional context dynamically passed
  [key: string]: any;
};

type Resource = {
  [key: string]: any;
};

type PolicyFunction<TActor = Actor, TResource = Resource> = (
  action: Action,
  actor: TActor,
  resource: TResource
) => boolean;

export const policies: Partial<Record<ResourceType, PolicyFunction<any, any>>> =
  {
    Resource: (action, actor, resource) => {
      if (actor.role === "Super Admin") return true;

      if (actor.role === "Student" && action === "read") {
        return actor.sectionId === resource.sectionId;
      }

      return false;
    },
    // More To Add
  };
