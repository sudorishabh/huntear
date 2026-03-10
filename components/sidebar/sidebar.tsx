import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  FileText,
  Hash,
  LayoutGrid,
  Columns2,
  Settings,
  UserRound,
} from "lucide-react";

const navItems = [
  { icon: LayoutGrid, label: "Dashboard", active: false },
  { icon: Columns2, label: "Job Board", active: true },
  { icon: FileText, label: "Resume Vault", active: false },
  { icon: Hash, label: "Keyword Analyzer", active: false },
  { icon: Settings, label: "Settings", active: false },
  { icon: UserRound, label: "Invite users", active: false },
];

export function AppSidebar() {
  return (
    <Sidebar className='border-r border-gray-800 bg-black'>
      <SidebarHeader className='bg-black px-6 py-6'>
        <span className='text-3xl font-bold tracking-tight text-blue-400'>
          Huntear
        </span>
      </SidebarHeader>
      <SidebarContent className='bg-black mt-6'>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className='gap-1'>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    isActive={item.active}
                    className='h-auto gap-2 rounded-none px-6 py-2 text-white hover:bg-neutral-800/50 hover:text-white data-[active=true]:bg-transparent data-[active=true]:text-white'>
                    <item.icon
                      size={16}
                      className='shrink-0 text-white'
                    />
                    <span
                      className={`text-[13px] ${item.active ? "font-bold" : "font-normal"}`}>
                      {item.label}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='bg-black border- border-neutral-800 px-4 py-4'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold text-sm shrink-0'>
            RN
          </div>
          <div className='flex flex-col min-w-0'>
            <span className='text-white text-[13px] font-medium truncate'>
              Rishabh Negi
            </span>
            <span className='text-neutral-400 text-[11px] truncate'>
              rishabh@email.com
            </span>
          </div>
          {/* <Settings
            size={15}
            className='ml-auto shrink-0 text-neutral-400 hover:text-white cursor-pointer'
          /> */}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
