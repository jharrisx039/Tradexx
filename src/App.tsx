import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { TodoList } from './components/TodoList';
import { Contacts } from './components/Contacts';
import { Tickets } from './components/Tickets';
import { Documents } from './components/Documents';
import { Chat } from './components/Chat';
import { HR } from './components/HR';
import { Finance } from './components/Finance';
import { Marketing } from './components/Marketing';
import { Events } from './components/Events';
import { Settings } from './components/Settings';
import { Services } from './components/Services';
import { ThemeProvider } from './components/ThemeProvider';
import { Search } from 'lucide-react';
import { SearchDialog } from './components/Search/SearchDialog';
import { PermissionGuard } from './components/PermissionGuard';
import { useAuthStore } from './store/auth';
import { Login } from './components/Login';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState('dashboard');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isSearchDialogOpen, setIsSearchDialogOpen] = React.useState(false);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearchDialogOpen(true);
    }
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderContent = () => {
    if (activeSection.startsWith('hr/')) {
      return (
        <PermissionGuard module="hr" action="view">
          <HR section={activeSection} />
        </PermissionGuard>
      );
    }

    if (activeSection.startsWith('finance/')) {
      return (
        <PermissionGuard module="finance" action="view">
          <Finance section={activeSection} />
        </PermissionGuard>
      );
    }

    if (activeSection.startsWith('marketing/')) {
      return (
        <PermissionGuard module="marketing" action="view">
          <Marketing section={activeSection} />
        </PermissionGuard>
      );
    }

    if (activeSection.startsWith('services/')) {
      const [, service, subsection] = activeSection.split('/');
      return (
        <PermissionGuard module="services" action="view">
          <Services section={service} subsection={subsection} />
        </PermissionGuard>
      );
    }

    const components = {
      dashboard: <PermissionGuard module="dashboard" action="view"><Dashboard /></PermissionGuard>,
      events: <PermissionGuard module="dashboard" action="view"><Events /></PermissionGuard>,
      tasks: <PermissionGuard module="tasks" action="view"><TodoList /></PermissionGuard>,
      contacts: <PermissionGuard module="contacts" action="view"><Contacts /></PermissionGuard>,
      tickets: <PermissionGuard module="tickets" action="view"><Tickets /></PermissionGuard>,
      documents: <PermissionGuard module="documents" action="view"><Documents /></PermissionGuard>,
      chat: <PermissionGuard module="chat" action="view"><Chat /></PermissionGuard>,
      settings: <PermissionGuard module="settings" action="view"><Settings /></PermissionGuard>,
    };

    return components[activeSection as keyof typeof components] || (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold text-text">Coming Soon</h2>
        <p className="mt-2 text-gray-600">This section is under development.</p>
      </div>
    );
  };

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
        <div className="flex-1 flex flex-col">
          <header className="bg-card border-b border-border p-4">
            <div className="max-w-3xl mx-auto relative">
              <form onSubmit={handleSearch}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ask anything..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </form>
            </div>
          </header>
          <main className="flex-1 p-8 overflow-auto">
            {renderContent()}
          </main>
        </div>
        <SearchDialog
          isOpen={isSearchDialogOpen}
          onClose={() => setIsSearchDialogOpen(false)}
          initialQuery={searchTerm}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;