import { Card, CardContent, CardHeader, Tab, Tabs } from '@sanctuanimal/ui';
import { SyntheticEvent, useState } from 'react';

import { ResidentDetailsGeneralNotes } from './general-notes';
import { ResidentDetailsHistoricalNotes } from './historical-notes';

const GENERAL = 'general';
const HISTORICAL = 'historical';

export const ResidentNotes = () => {
  const [activeTab, setActiveTab] = useState(GENERAL);

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Card>
      <CardHeader title="Resident notes" />
      <CardContent>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab value={GENERAL} label="General" />
          <Tab value={HISTORICAL} label="Historical" />
        </Tabs>

        {activeTab === GENERAL && <ResidentDetailsGeneralNotes />}
        {activeTab === HISTORICAL && <ResidentDetailsHistoricalNotes />}
      </CardContent>
    </Card>
  );
};
