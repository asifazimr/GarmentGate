export const CHAT_SCAN_QUEUE = 'chat-scan';

/** Check a chat attachment for contact details (file name already done; this reads PDFs). */
export interface ChatScanJob {
  attachmentId: string;
}
