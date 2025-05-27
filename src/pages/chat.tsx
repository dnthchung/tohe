import { Layout } from "../components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function Chat() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Chat</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>Chat with your team members.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Chat content will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
