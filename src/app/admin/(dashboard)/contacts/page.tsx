import { getAllContactRequests } from "@/lib/data";
import { ContactsManager } from "@/components/admin/ContactsManager";

export default async function AdminContactsPage() {
  const contacts = await getAllContactRequests();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Contacts</h1>
        <p className="text-muted mt-1">Manage contact form inquiries</p>
      </div>
      <ContactsManager contacts={contacts} />
    </div>
  );
}
