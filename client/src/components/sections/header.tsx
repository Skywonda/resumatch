import { MapPin, Mail, Link as LinkIcon, Phone } from "lucide-react";
import { EditableText } from "../editableText";

interface HeaderSectionProps {
  isEditing: boolean;
  data: {
    name: string;
    title: string;
    contacts: {
      phone: string;
      linkedin: string;
      email: string;
      location: string;
    };
  };
  onUpdate: (updates: Partial<HeaderSectionProps["data"]>) => void;
}

// export const HeaderSection: React.FC<HeaderSectionProps> = ({
//   isEditing,
//   data,
//   onUpdate,
// }) => {
//   return (
//     <header className="flex justify-between items-start mb-8">
//       <div>
//         <div className="text-3xl font-bold mb-2">
//           <EditableText
//             value={data.name}
//             onChange={(name) => onUpdate({ name })}
//             isEditing={isEditing}
//           />
//         </div>
//         <div className="text-lg text-blue-500 mb-4">
//           <EditableText
//             value={data.title}
//             onChange={(title) => onUpdate({ title })}
//             isEditing={isEditing}
//           />
//         </div>
//         <div className="space-y-1 text-sm text-muted-foreground">
//           <div className="flex items-center gap-2">
//             <Phone className="h-4 w-4" />
//             <EditableText
//               value={data.contacts.phone}
//               onChange={(phone) =>
//                 onUpdate({ contacts: { ...data.contacts, phone } })
//               }
//               isEditing={isEditing}
//             />
//           </div>
//           <div className="flex items-center gap-2">
//             <LinkIcon className="h-4 w-4" />
//             <EditableText
//               value={data.contacts.linkedin}
//               onChange={(linkedin) =>
//                 onUpdate({ contacts: { ...data.contacts, linkedin } })
//               }
//               isEditing={isEditing}
//             />
//           </div>
//           <div className="flex items-center gap-2">
//             <Mail className="h-4 w-4" />
//             <EditableText
//               value={data.contacts.email}
//               onChange={(email) =>
//                 onUpdate({ contacts: { ...data.contacts, email } })
//               }
//               isEditing={isEditing}
//             />
//           </div>
//           <div className="flex items-center gap-2">
//             <MapPin className="h-4 w-4" />
//             <EditableText
//               value={data.contacts.location}
//               onChange={(location) =>
//                 onUpdate({ contacts: { ...data.contacts, location } })
//               }
//               isEditing={isEditing}
//             />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  isEditing,
  data,
  onUpdate,
}) => (
  <header className="mb-8">
    <h1 className="text-4xl font-bold tracking-tight mb-1">
      <EditableText
        value={data.name}
        onChange={(name) => onUpdate({ name })}
        isEditing={isEditing}
      />
    </h1>
    <h2 className="text-lg text-blue-500 font-medium mb-3">
      <EditableText
        value={data.title}
        onChange={(title) => onUpdate({ title })}
        isEditing={isEditing}
      />
    </h2>
    <div className="flex flex-col gap-1.5 text-[0.95rem] text-gray-700">
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-gray-500" />
        <EditableText
          value={data.contacts.email}
          onChange={(email) =>
            onUpdate({ contacts: { ...data.contacts, email } })
          }
          isEditing={isEditing}
        />
      </div>
      <div className="flex items-center gap-2">
        <LinkIcon className="h-4 w-4 text-gray-500" />
        <EditableText
          value={data.contacts.linkedin}
          onChange={(linkedin) =>
            onUpdate({ contacts: { ...data.contacts, linkedin } })
          }
          isEditing={isEditing}
        />
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-gray-500" />
        <EditableText
          value={data.contacts.location}
          onChange={(location) =>
            onUpdate({ contacts: { ...data.contacts, location } })
          }
          isEditing={isEditing}
        />
      </div>
    </div>
  </header>
);
