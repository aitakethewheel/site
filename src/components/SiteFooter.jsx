import React from 'react';
import { Link } from 'react-router-dom';

export default function SiteFooter({ notice = '' }) {
  return (
    <footer style={styles.footer}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', width: '100%' }}>
        <div style={{ opacity: 0.85 }}>
          <div>© 2025 AI Take The Wheel – Salvation pending system update.</div>
          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>Blessed by Our Lady of Perpetual Beta.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {notice && (
            <div style={{
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.06)',
              padding: '6px 10px',
              borderRadius: 8,
              fontSize: 12,
              color: 'rgba(255,255,255,0.9)'
            }}>
              {notice}
            </div>
          )}
          <Link to="/patchnotes" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'underline' }}>Blessed Patch Notes</Link>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: { marginTop: 0, padding: '14px 24px', borderTop: '1px solid rgba(255,255,255,0.1)', opacity: 0.8 }
};
