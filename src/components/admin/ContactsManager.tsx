"use client";

import { updateContactStatus } from "@/lib/actions/admin";
import { AdminTable, StatusSelect } from "@/components/admin/AdminTable";
import { formatDateTime } from "@/lib/utils";
import type { ContactRequest, BookingStatus } from "@/types/database";

export function ContactsManager({
  contacts,
}: {
  contacts: ContactRequest[];
}) {
  async function handleStatusChange(id: string, status: BookingStatus) {
    await updateContactStatus(id, status);
  }

  return (
    <AdminTable headers={["Name", "Phone", "Email", "Message", "Status", "Date"]}>
      {contacts.length === 0 ? (
        <tr>
          <td colSpan={6} className="px-4 py-12 text-center text-muted">
            No contact requests yet.
          </td>
        </tr>
      ) : (
        contacts.map((contact) => (
          <tr
            key={contact.id}
            className="border-b border-border hover:bg-white/[0.02]"
          >
            <td className="px-4 py-3 font-medium">{contact.name}</td>
            <td className="px-4 py-3 text-muted text-xs">{contact.phone}</td>
            <td className="px-4 py-3 text-muted text-xs">{contact.email}</td>
            <td className="px-4 py-3 text-muted text-xs max-w-xs">
              {contact.message}
            </td>
            <td className="px-4 py-3">
              <StatusSelect
                value={contact.status}
                onChange={(s) => handleStatusChange(contact.id, s)}
              />
            </td>
            <td className="px-4 py-3 text-muted text-xs">
              {formatDateTime(contact.created_at)}
            </td>
          </tr>
        ))
      )}
    </AdminTable>
  );
}
